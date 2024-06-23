package helpers

import (
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jackc/pgx/v5/stdlib" // Standard library bindings for pgx
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

func (s *Server) FetchSaleProducts(c *gin.Context) {
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

	var viewListData []map[string]interface{}

	query := `SELECT * FROM sales ORDER BY sale_date DESC`

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
		r := make(map[string]interface{})
		err = rows.MapScan(r)
		if err != nil {
			ReturnAPITechnicalError(c, InternalServerError, err, "Error scanning data in appoinment table")
			return
		}

		convertJSONBColumns(r)
		viewListData = append(viewListData, r)
	}
	if err = rows.Err(); err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "Error iterating over rows")
		return
	}

	c.AbortWithStatusJSON(Ok, gin.H{
		"saleProductList":    viewListData,
		"httpResponseCode":   Ok,
		"businessStatusCode": BusinessSuccess,
	})

}
