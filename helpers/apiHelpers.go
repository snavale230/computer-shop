package helpers

import (
	"time"

	"github.com/rs/zerolog/log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Server is a struct that represents a server.
type Server struct {
	Router *gin.Engine // Router is the Gin router used by the server.
}

// InitializeRoutes initializes the routes for the server using the Gin router. It creates the necessary endpoints and starts the server on port 1972.
func (s *Server) InitializeRoutes() error {

	// Create a new Gin router with default middleware
	s.Router = gin.Default()

	// Configure CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // Allow all origins
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour

	// r.Use(cors.New(config))
	s.Router.Use(cors.New(config))

	s.Router.POST("/shree-computer-shop/user-login/", func(c *gin.Context) {
		s.UserLoginAPI(c)
	})
	s.Router.POST("/shree-computer-shop/add-product/", func(c *gin.Context) {
		s.AddProduct(c)
	})
	s.Router.POST("/shree-computer-shop/sell-product/", func(c *gin.Context) {
		s.SellProduct(c)
	})
	s.Router.GET("/shree-computer-shop/available-product/", func(c *gin.Context) {
		s.AvailableProducts(c)
	})
	// s.Router.GET("/vijay-shop/fetch-appointment-audit/", func(c *gin.Context) {
	// 	s.FetchAppointmentFormAudit(c)
	// })

	// Start the server on port 1421
	err := s.Router.Run(":1421")
	if err != nil {
		log.Error().Err(err).Msg("Failed to start the server")
		return err
	}
	return nil
}
