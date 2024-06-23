package helpers

import (
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func ReturnAPITechnicalError(c *gin.Context, statusCode int, err error, msg string) {
	msg = strings.ToLower(msg)
	ErrorLogger(err, msg)
	switch statusCode {
	case InternalServerError:
		msg = "internal server error"
	case BadRequest:
		msg = "bad request"
	case Unauthorized:
		msg = "unauthorized user"
	default:
		// Do nothing
		msg = ""
	}
	c.AbortWithStatusJSON(statusCode, gin.H{"errorCode": statusCode, "message": msg})
}

func ErrorLogger(err error, msg string) {
	msg = strings.ToLower(msg)
	log.Error().Err(err).Msg(msg)
}

// IsValidIndianMobileNumber checks if the given mobile number is a valid Indian mobile number.
func IsValidIndianMobileNumber(number string) bool {
	// Define a regular expression for a valid Indian mobile number
	// This regex allows numbers that start with 7, 8, or 9 and are followed by 9 more digits
	var validIndianNumberPattern = regexp.MustCompile(`^[789]\d{9}$`)

	// Check if the mobile number matches the pattern
	return validIndianNumberPattern.MatchString(number)
}
func InfoLogger(msg string) {
	msg = strings.ToLower(msg)
	log.Info().Msg(msg)
}

type TechnicallySuccessFullResponseButNotFunctionally struct {
	HttpResponseCode      int     `json:"httpResponseCode,omitempty"`
	BusinessStatusCode    int     `json:"businessStatusCode,omitempty"`
	BusinessStatusSubCode float64 `json:"businessStatusSubCode,omitempty"`
	Msg                   string  `json:"message,omitempty"`
}

func NewTechnicallySuccessFullResponseButNotFunctionally(message string, businessStatusSubCode ...float64) *TechnicallySuccessFullResponseButNotFunctionally {
	var businessStatusSubCodeFinal float64
	businessStatusSubCodeFinal = 0.0
	if len(businessStatusSubCode) > 0 {
		businessStatusSubCodeFinal = businessStatusSubCode[0]
	}
	return &TechnicallySuccessFullResponseButNotFunctionally{
		HttpResponseCode:      Ok,
		BusinessStatusCode:    BusinessFailure,
		BusinessStatusSubCode: businessStatusSubCodeFinal,
		Msg:                   message,
	}
}

func ReturnAPIFunctionalError(c *gin.Context, msg string, businessStatusSubCode ...float64) {
	InfoLogger(msg)

	var technicallySuccessFullFunctionallyNot *TechnicallySuccessFullResponseButNotFunctionally
	if len(businessStatusSubCode) > 0 {
		technicallySuccessFullFunctionallyNot = NewTechnicallySuccessFullResponseButNotFunctionally(msg, businessStatusSubCode...)
	} else {
		technicallySuccessFullFunctionallyNot = NewTechnicallySuccessFullResponseButNotFunctionally(msg)
	}
	c.AbortWithStatusJSON(Ok, technicallySuccessFullFunctionallyNot)
}
