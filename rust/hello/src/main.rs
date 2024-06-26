use std::fs;
use std::io::prelude::*;
use std::net::TcpListener;

fn handle_connection(mut stream: std::net::TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();
    let request = String::from_utf8_lossy(&buffer[..]);
    let mut req_lines = request.lines();
    let path = req_lines.next().unwrap();
    println!("Request: {}", path);

    let get_prefix = b"GET / HTTP/1.1\r\n";
    let (head, file) = if buffer.starts_with(get_prefix) {
        ("HTTP/1.1 200 OK", "index.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND", "404.html")
    };
    println!("Response: {}", head);
    let contents = fs::read_to_string(file).unwrap();
    let response = format!("{}\r\n\r\n{}", head, contents);

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}

fn main() {
    println!("Hello, world!");
    let addr = "127.0.0.1:8080";
    let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
    println!("Listening on http://{}", addr);
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        println!("Connection established!");
        handle_connection(stream);
    }
}
