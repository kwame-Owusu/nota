package main

import "net/http"

type application struct {
	config config
	// logger
	// db driver
}

// mount
func (app *application) mount() http.Handler {
	return nil
}

type config struct {
	addr string
	db   dbConfig
}

type dbConfig struct {
}
