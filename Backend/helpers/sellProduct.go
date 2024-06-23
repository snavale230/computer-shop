package helpers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/jackc/pgx/v5/stdlib" // Standard library bindings for pgx
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
)

func (s *Server) SellProduct(c *gin.Context) {
	var SellProductInput struct {
		SaleQuantity   int    `json:"saleQuantity"`
		ProductId      string `json:"productId"`
		Name           string `json:"salePrice"`
		CustomerMobile string `json:"customerMobile"`
		CustomerName   string `json:"customerMobile"`
		AppoinmentTime string `json:"appoinment_time"`
		Address        string `json:"address"`
		Description    string `json:"description"`
		Service        string `json:"service"`
	}

	if err := c.ShouldBindJSON(&SellProductInput); err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "could not bind to json")
		return
	}
	if AddProductInput.ProductName == "" {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("product name is not found"), "Please provide a correct request. The product name is empty.")
		return
	}
	if AddProductInput.ProductBrand == "" {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("product brand is not found"), "Please provide a correct request. The product brand is empty.")
		return
	}
	if AddProductInput.ProductStatus == "" {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("product status is not found"), "Please provide a correct request. The product status is empty.")
		return
	}
	if AddProductInput.ProductPrice == 0 {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("product price is not found"), "Please provide a correct request. The product price is empty.")
		return
	}
	if AddProductInput.ProductQuantity == 0 {
		ReturnAPITechnicalError(c, BadRequest, fmt.Errorf("product quqntity is not found"), "Please provide a correct request. The product quantity is empty.")
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

	var productDesciption, category, supplierName, supplierContact interface{}
	if AddProductInput.ProductDescription != "" {
		productDesciption = AddProductInput.ProductDescription
	} else {
		productDesciption = nil
	}
	if AddProductInput.Category != "" {
		category = AddProductInput.Category
	} else {
		category = nil
	}
	if AddProductInput.SupplierName != "" {
		supplierName = AddProductInput.SupplierName
	} else {
		supplierName = nil
	}
	if AddProductInput.SupplierContact != "" {
		supplierContact = AddProductInput.SupplierContact
	} else {
		supplierContact = nil
	}

	var productId string
	err = db.QueryRow(`INSERT INTO products (product_name, product_brand, product_status, product_price, product_quantity, product_description, category, supplier_name, supplier_contact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING product_id`, AddProductInput.ProductName, AddProductInput.ProductBrand, AddProductInput.ProductStatus, AddProductInput.ProductPrice, AddProductInput.ProductQuantity, productDesciption, category, supplierName, supplierContact).Scan(&productId)
	if err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "Error inserting data into the products table")
		return
	}

	if AddProductInput.ProductStatus == "available" {
		c.AbortWithStatusJSON(Ok, gin.H{
			"message":            fmt.Sprintf("Product Id : %v, %v-%v This Product is available for sale!", productId, AddProductInput.ProductBrand, AddProductInput.ProductName),
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessSuccess,
		})
	} else {
		c.AbortWithStatusJSON(Ok, gin.H{
			"message":            fmt.Sprintf("Product Id : %v, %v-%v This Product is Added Successfully!", productId, AddProductInput.ProductBrand, AddProductInput.ProductName),
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessSuccess,
		})
	}

}
