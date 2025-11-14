package main

func main() {
	cfg := config{
		addr: ":8080", // our port
		db:   dbConfig{},
	}

	api := application{
		config: cfg,
	}
}
