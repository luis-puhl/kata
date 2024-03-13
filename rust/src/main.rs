use std::time::{Duration, SystemTime};

#[derive(Debug)]
struct Bucket {
    pub instant: SystemTime,
    pub counter: usize,
    pub limit: usize,
    pub rate: usize,
    pub interval: usize,
}

impl Bucket {
    fn new() -> Bucket {
        return Bucket {
            instant: SystemTime::now(),
            counter: 0,
            limit: 100,
            rate: 100,
            interval: 60,
        };
    }

    fn ingest(&mut self) -> &mut Self {
        self.counter += 1;
        self.instant = SystemTime::now();
        self
    }

    fn is_limited(&self) -> bool {
        return self.counter > self.limit;
    }
}

/*
trait RateLimit {
    fn intake(&mut self, instant: SystemTime) -> Self;
    fn is_limited(&self) -> bool;
}

impl RateLimit for Bucket {
    fn intake(&mut self, instant: SystemTime) -> Bucket {
        return &self;
    }
    fn is_limited(&self) {
        return false;
    }
}
*/

fn main() {
    println!("Hello, world!");
    let mut bucket: Bucket = Bucket::new();
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.counter += 1;
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.ingest();
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());
}
