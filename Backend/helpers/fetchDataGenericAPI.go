package helpers

import (
	"errors"
	"fmt"
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

type Parameter struct {
	ColumnName string      `json:"columnName"`
	Condition  string      `json:"condition"`
	Value      interface{} `json:"value"`
}

func (s *Server) FetchDataGenericAPI(c *gin.Context) {
	InfoLogger("The task to FetchDataGenericAPI has started")
	var GenericInput struct {
		EntityType string      `json:"entity_type"`
		Parameters []Parameter `json:"parameter,omitempty"`
		Columns    []string    `json:"columns"`
	}

	if err := c.ShouldBindJSON(&GenericInput); err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "could not bind to json")
		return
	}

	DebugLogger("Connecting to database")
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
	DebugLogger("Connected to database")
	tableName := strings.ToLower(GenericInput.EntityType)
	DebugLogger(fmt.Sprintf("Print table name:%+v", tableName))
	// Constructing the WHERE clause
	whereClause, err := buildWhereClause(GenericInput.Parameters)
	if err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, "error creating where clause")
		return
	}
	DebugLogger(fmt.Sprintf("Print whereClause:%+v", whereClause))
	query := fmt.Sprintf("SELECT %s FROM %s %s", joinStrings(GenericInput.Columns, ", "), tableName, whereClause)

	DebugLogger(fmt.Sprintf("Print query:%+v", query))
	rows, err := db.Queryx(query)
	if err != nil {
		ReturnAPITechnicalError(c, InternalServerError, err, fmt.Sprintf("Error executing the query in %s table", tableName))
		return
	}
	defer func(rows *sqlx.Rows) {
		err2 := rows.Close()
		if err2 != nil {
			ErrorLogger(err2, "error while closing rows")
		}
	}(rows)

	var viewListData []map[string]interface{}
	for rows.Next() {
		r := make(map[string]interface{})
		err = rows.MapScan(r)
		if err != nil {
			ReturnAPITechnicalError(c, InternalServerError, err, fmt.Sprintf("Error scanning data in %s table", tableName))
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
		"entityType":         tableName,
		"list":               viewListData,
		"httpResponseCode":   Ok,
		"businessStatusCode": BusinessSuccess,
	})
	InfoLogger("The task to FetchDataGenericAPI has Completed")
}

// Helper function to join strings with a separator
func joinStrings(slice []string, sep string) string {
	InfoLogger("The task to joinStrings has started")
	if len(slice) == 0 {
		return ""
	}
	if len(slice) == 1 {
		return slice[0]
	}
	result := slice[0]
	for _, s := range slice[1:] {
		result += sep + s
	}
	DebugLogger(fmt.Sprintf("Print result: %+v", result))
	InfoLogger("The task to joinStrings has Completed")
	return result
}

func buildWhereClause(filters []Parameter) (string, error) {
	InfoLogger("buildWhereClause task has started")

	var clauses []string

	for _, filter := range filters {
		parameter := filter.ColumnName
		value := filter.Value
		condition := filter.Condition

		// Handling different types of conditions and values
		var clause string
		percentage := "%"

		switch strings.ToUpper(condition) {
		case "=", "<", ">", "<=", ">=", "!=":
			// clause = fmt.Sprintf("%s %s %s", parameter, condition, value)
			if bValue, ok := value.(bool); ok {
				// Format boolean value without quotes
				clause = fmt.Sprintf("%s %s %t", parameter, condition, bValue)
			} else {
				// Format other types of values
				clause = fmt.Sprintf("%s %s '%v'", parameter, condition, value)
			}
		case "IS", "IS NOT":
			clause = fmt.Sprintf("%s %s %v", parameter, condition, value)
		case "IN":
			val := interfaceToString(value)
			result, err := seperateRole(val)
			if err != nil {
				ErrorLogger(err, "Error Seperating value")
				return "", err
			}
			clause = fmt.Sprintf("%s %s %s", parameter, condition, result)

		case "CONTAINS":
			clause = fmt.Sprintf("%s %s %s'%v'%s", parameter, condition, percentage, value, percentage)
		case "STARTSWITH":
			clause = fmt.Sprintf("%s %s '%v'%s", parameter, condition, value, percentage)
		case "ENDSWITH":
			clause = fmt.Sprintf("%s %s %s'%v'", parameter, condition, percentage, value)
		default:
			log.Printf("Unsupported condition: %s", condition)
			continue
		}

		clauses = append(clauses, clause)
	}

	if len(clauses) > 0 {
		return "WHERE " + strings.Join(clauses, " AND "), nil
	}
	InfoLogger("buildWhereClause task has been completed")

	return "", nil
}

func seperateRole(input string) (string, error) {
	InfoLogger("seperateRole task has started")

	parts := strings.Split(input, ",")

	var result string
	if len(parts) > 0 {
		result += "("
		for i, part := range parts {
			if i > 0 {
				result += ","
			}
			result += fmt.Sprintf("'%s'", part)
		}
		result += ")"
		InfoLogger("seperateRole task has been completed")

		return result, nil
	} else {
		InfoLogger("seperateRole task has been completed")

		return "", errors.New("input format is invalid")
	}
}

func interfaceToString(i interface{}) string {
	InfoLogger("interfaceToString task has started")

	switch v := i.(type) {
	case string:
		return v
	default:
		return fmt.Sprintf("%v", v)
	}
}
