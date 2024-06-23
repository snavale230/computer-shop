package helpers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jackc/pgx/v5/stdlib" // Standard library bindings for pgx
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

func (s *Server) DeleteProduct(c *gin.Context) {
	var DeleteProductInput struct {
		ProductId string `json:"productId"`
	}
	if err := c.ShouldBindJSON(&DeleteProductInput); err != nil {
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

	query := fmt.Sprintf("DELETE FROM sales WHERE product_id = '%v'", DeleteProductInput.ProductId)
	_, err = db.Exec(query)
	if err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "Error executing the query in sales table")
		return
	}

	query = fmt.Sprintf("DELETE FROM products WHERE product_id = '%v'", DeleteProductInput.ProductId)
	_, err = db.Exec(query)
	if err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "Error executing the query in products table")
		return
	}

	c.AbortWithStatusJSON(Ok, gin.H{
		"message":            "Product Deleted Successfully",
		"httpResponseCode":   Ok,
		"businessStatusCode": BusinessSuccess,
	})
}
