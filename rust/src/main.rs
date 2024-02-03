use std::time::{Duration, SystemTime};

#[derive(Debug)]
struct Bucket {
    pub instant: SystemTime,
    pub counter: usize,
    pub limit: usize,
    pub rate: usize,
    pub interval: usize,
}

fn main() {
    println!("Hello, world!");
    let bucket: Bucket = Bucket {
        instant: SystemTime::now(),
        counter: 0,
        limit: 100,
        rate: 100,
        interval: 60,
    };
    println!("{:#?}", bucket);
}
