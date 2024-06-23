package helpers

import (
	"database/sql"
	"errors"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jackc/pgx/v5/stdlib" // Standard library bindings for pgx
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
)

func (s *Server) UserLoginAPI(c *gin.Context) {
	var UserLoginInput struct {
		Mobile   string `json:"mobile"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&UserLoginInput); err != nil {
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

	var systemUserName string
	valid := IsValidIndianMobileNumber(UserLoginInput.Mobile)
	if valid {
		query := "SELECT su.user_name FROM public.system_user su WHERE su.mobile = $1 AND su.password = $2"
		// Query to check if the ID exists and fetch the name
		err = db.QueryRow(query, UserLoginInput.Mobile, UserLoginInput.Password).Scan(&systemUserName)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				ErrorLogger(err, "Error fetching user name from system user table")
				ReturnAPIFunctionalError(c, "Invalid User")
				return
			}
			ReturnAPITechnicalError(c, InternalServerError, err, "error fetching data")
			return
		}
	} else {
		ReturnAPIFunctionalError(c, "Invalid Mobile Number")
		return
	}

	if systemUserName != "" {
		c.AbortWithStatusJSON(Ok, gin.H{
			"message":            "Login Successful, Welcome " + systemUserName,
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessSuccess,
		})
		return
	} else {
		c.AbortWithStatusJSON(Ok, gin.H{
			"message":            "Login Unsuccessful",
			"httpResponseCode":   Ok,
			"businessStatusCode": BusinessSuccess,
		})
		return
	}

}
