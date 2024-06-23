package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/rs/zerolog/log"
	// _ "github.com/lib/pq" // Import PostgreSQL driver
)

// ConnectDB opens a connection to the PostgreSQL database.
func ConnectDBSQL() (*sql.DB, error) {
	log.Debug().Msg("Connecting to database")
	dsn := "u190031182_physio_relief:PhysioRelief@123@tcp(thephysiorelief.com:3306)/u190031182_physio_relief"

	// Open a connection to the database
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Error().Err(err).Msg("Failed to connect to the database")
		// log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// Verify the connection is successful
	err = db.Ping()
	if err != nil {
		log.Error().Err(err).Msg("Error connecting to the database")
		// log.Fatalf("Error connecting to the database: %v", err)
	}
	log.Debug().Msg("Connected to database")
	return db, nil
}

// ConnectDB opens a connection to the PostgreSQL database.
func ConnectDBSQLX() (*sqlx.DB, error) {
	log.Debug().Msg("Connecting to database")
	dsn := "u190031182_physio_relief:PhysioRelief@123@tcp(thephysiorelief.com:3306)/u190031182_physio_relief"

	// Open a connection to the database
	db, err := sqlx.Open("mysql", dsn)
	if err != nil {
		log.Error().Err(err).Msg("Failed to connect to the database")
		// log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// Verify the connection is successful
	err = db.Ping()
	if err != nil {
		log.Error().Err(err).Msg("Error connecting to the database")
		// log.Fatalf("Error connecting to the database: %v", err)
	}
	log.Debug().Msg("Connected to database")
	return db, nil
}
