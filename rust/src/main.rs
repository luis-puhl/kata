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
}

fn is_limited(bucket: &Bucket) -> bool {
    return bucket.counter > bucket.limit;
}

fn ingest(bucket: &mut Bucket) -> Bucket {
    return Bucket {
        instant: SystemTime::now(),
        counter: bucket.counter + 1,
        limit: bucket.limit,
        rate: bucket.rate,
        interval: bucket.interval,
    };
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
    println!("{:#?}", bucket);
    println!("{:#?}", is_limited(&bucket));

    // ingest(&bucket);
    bucket.counter += 1;
    println!("{:#?}", bucket);
    println!("{:#?}", is_limited(&bucket));
}
