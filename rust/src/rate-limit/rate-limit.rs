use std::time::{Duration, SystemTime};

struct Bucket {
    instant: SystemTime,
    counter: usize,
    limit: usize,
    rate: usize,
    interval: usize,
}

fn main() {
    let bucket = Bucket {
        instant: timestamp,
        counter: i32,
        limit: i32,
        rate: i32,
        interval: i32,
    };
}
