package helpers

import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/jackc/pgx/v5/stdlib" // Standard library bindings for pgx
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

func (s *Server) SellProduct(c *gin.Context) {
	var SellProductInput struct {
		ProductQuantity int     `json:"productQuantity"`
		ProductId       string  `json:"productId"`
		ProductPrice    float64 `json:"productPrice"`
		CustomerMobile  string  `json:"customerMobile"`
		CustomerName    string  `json:"customerName"`
		Description     string  `json:"description"`
	}

	if err := c.ShouldBindJSON(&SellProductInput); err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "could not bind to json")
		return
	}
	if SellProductInput.ProductQuantity == 0 {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("sell quantity is not found"), "Please provide a correct request. The sell quantity is 0.")
		return
	}
	if SellProductInput.ProductId == "" {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("product id is not found"), "Please provide a correct request. The product id is empty.")
		return
	}
	if SellProductInput.ProductPrice == 0 {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("sell price is not found"), "Please provide a correct request. The sell price is 0.")
		return
	}
	if SellProductInput.CustomerName == "" {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("customer name is not found"), "Please provide a correct request. The customer name is empty.")
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

	var customerMobile, description interface{}
	if SellProductInput.CustomerMobile != "" {
		customerMobile = SellProductInput.CustomerMobile
	} else {
		customerMobile = nil
	}
	if SellProductInput.Description != "" {
		description = SellProductInput.Description
	} else {
		description = nil
	}

	var quantity sql.NullFloat64
	query := `SELECT product_quantity FROM products WHERE product_id = $1`
	err = db.QueryRow(query, SellProductInput.ProductId).Scan(&quantity)
	if err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "could not get product quantity in products table")
		return
	}

	if quantity.Float64 >= float64(SellProductInput.ProductQuantity) {
		availableQuantity := quantity.Float64 - float64(SellProductInput.ProductQuantity)
		if availableQuantity == 0 {
			query := `UPDATE products SET product_status = 'sold', product_quantity = null WHERE product_id = $1`
			_, err = db.Exec(query, SellProductInput.ProductId)
			if err != nil {
				ReturnAPITechnicalError(c, InternalServerError, err, "could not execute query in products table")

			}
		} else {
			query := `UPDATE products SET product_status = 'available', product_quantity = $1 WHERE product_id = $2`
			_, err = db.Exec(query, availableQuantity, SellProductInput.ProductId)
			if err != nil {
				ReturnAPITechnicalError(c, InternalServerError, err, "could not execute query in products table")
				return
			}
		}
		var saleId string
		err = db.QueryRow(`INSERT INTO sales (product_id, sale_quantity, sale_price, customer_name, customer_mobile, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING sale_id`, SellProductInput.ProductId, SellProductInput.ProductQuantity, SellProductInput.ProductPrice, SellProductInput.CustomerName, customerMobile, description).Scan(&saleId)
		if err != nil {
			ReturnAPITechnicalError(c, InternalServerError, err, "Error inserting data into the sales table")
			return
		}

		c.AbortWithStatusJSON(Ok, gin.H{
			"message":            fmt.Sprintf("Sell Id: %v, Product Id: %v This Product is selled!", saleId, SellProductInput.ProductId),
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessSuccess,
		})
		return
	} else {
		c.AbortWithStatusJSON(Ok, gin.H{
			"message":            fmt.Sprintf("Insufficient stock: only %v units available, but %v units requested.", quantity.Float64, SellProductInput.ProductQuantity),
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessFailure,
		})
		return
	}
}
