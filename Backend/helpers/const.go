package helpers

import "net/http"

const (
	InternalServerError = http.StatusInternalServerError
	Ok                  = http.StatusOK
	BadRequest          = http.StatusBadRequest
	Unauthorized        = http.StatusUnauthorized
	// Dsn                 = "postgres:Pass@123@tcp(localhost:5435)/ShreeComp"
	Dsn             = "user=postgres password=Pass@123 dbname=ShreeComp host=localhost port=5435 sslmode=disable"
	BusinessSuccess = 2
	BusinessFailure = 1
)
