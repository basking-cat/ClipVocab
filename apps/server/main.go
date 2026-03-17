package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from Go API!")
	})

	fmt.Println("Server starting at :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}