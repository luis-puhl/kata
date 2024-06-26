use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, Result};
use std::time::SystemTime;
use serde::Deserialize;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

#[derive(Debug)]
enum Variant {
    Outsider,
    Control,
    Treatment(String),
}

#[derive(Debug)]
struct Experiment {
    id: u32,
    name: String,
    description: String,
    variants: Vec<String>,
    population: String,
    start: SystemTime,
    end: SystemTime,
    metrics: Vec<String>,
}

#[derive(Debug)]
enum ExposureKind {
    Query,
    Application,
}

#[derive(Debug)]
struct Exposure {
    experiment: Experiment,
    subject: String,
    variant: Variant,
    timestamp: SystemTime,
    kind: ExposureKind,
}

#[derive(Deserialize)]
struct Info {
    id: u32,
    subject: String,
}

#[post("/expose/{id}/{subject}")]
async fn log(path: web::Path<Info>, req_body: String) -> impl Responder {
    let exposure = Exposure {
        experiment: Experiment {
            id: path.id,
            name: "Test".to_string(),
            description: "Test".to_string(),
            variants: vec!["Control".to_string(), "Treatment".to_string()],
            population: "Test".to_string(),
            start: SystemTime::now(),
            end: SystemTime::now(),
            metrics: vec!["Test".to_string()],
        },
        subject: path.subject.to_string(),
        variant: Variant::Outsider,
        timestamp: SystemTime::now(),
        kind: ExposureKind::Application,
    };
    println!("log {}, {:?}", req_body, exposure);
    HttpResponse::Ok().body(format!("{:?}\n", exposure))
}

#[get("/expose/{id}/{subject}")]
async fn expose(info: web::Path<Info>) -> Result<String> {
    let variant = "treatment";
    println!("Experiment {} will expose {} to subject {}", info.id, variant, info.subject);
    Ok(format!("Experiment {} will expose {} to subject {}\n", info.id, variant, info.subject))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .service(log)
            .service(expose)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
