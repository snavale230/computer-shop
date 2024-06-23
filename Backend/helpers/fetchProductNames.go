package helpers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

func (s *Server) FetchProductNames(c *gin.Context) {
	var FetchDataInput struct {
		ProductName string `json:"productName"`
	}
	if err := c.ShouldBindJSON(&FetchDataInput); err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "could not bind to json")
		return
	}
	log.Debug().Msg("Connecting to database")
	// Open a connection to the database
	db, err := sqlx.Open("postgres", Dsn)
	if err != nil {
		ErrorLogger(err, "Failed to connect to the database")
		return
	}
	defer db.Close()

	// Verify the connection is successful
	err = db.Ping()
	if err != nil {
		ErrorLogger(err, "Error connecting to the database")
		return
	}
	log.Debug().Msg("Connected to database")

	var viewListData []string

	var query string
	if FetchDataInput.ProductName != "" {
		query = fmt.Sprintf("SELECT DISTINCT product_brand FROM products WHERE product_name = '%v' AND product_status = 'available'", FetchDataInput.ProductName)
	} else {
		query = `SELECT DISTINCT product_name FROM products WHERE product_status = 'available' AND product_quantity > 0`
	}
	rows, err := db.Queryx(query)
	if err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "Error executing the query in appoinment audit table")
		return
	}
	defer func(rows *sqlx.Rows) {
		err2 := rows.Close()
		if err2 != nil {
			ErrorLogger(err2, "error while closing rows")
		}
	}(rows)
	for rows.Next() {
		var r string
		err = rows.Scan(&r)
		if err != nil {
			ReturnAPITechnicalError(c, InternalServerError, err, "Error scanning data in appoinment table")
			return
		}

		// convertJSONBColumns(r)
		viewListData = append(viewListData, r)
	}
	if err = rows.Err(); err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "Error iterating over rows")
		return
	}

	if FetchDataInput.ProductName != "" {
		c.AbortWithStatusJSON(Ok, gin.H{
			"productBrand":       viewListData,
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessSuccess,
		})
	} else {
		c.AbortWithStatusJSON(Ok, gin.H{
			"productNames":       viewListData,
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessSuccess,
		})
	}
}
