use std::time::{Duration, SystemTime};

#[derive(Debug)]
struct Bucket {
    pub instant: SystemTime,
    pub counter: u128,
    pub limit: u128,
    pub rate: u128,
    pub interval: Duration,
}

impl Bucket {
    fn ingest(&mut self, new_instant: SystemTime) -> &mut Self {
        self.counter += 1;
        self.instant = new_instant;
        self
    }

    fn is_limited(&self) -> bool {
        return self.counter > self.limit;
    }

    fn leak(&mut self, new_instant: SystemTime) -> &mut Self {
        let elapsed = new_instant
            .duration_since(self.instant)
            .unwrap_or_else(|_error| Duration::ZERO);
        if elapsed < self.interval {
            return self;
        }
        let intervals = elapsed.as_micros() / self.interval.as_micros();
        if intervals < 1 {
            return self;
        }
        let leak = intervals * self.rate;
        self.counter -= self.counter.min(leak);
        self.instant = new_instant;
        self
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
    let mut bucket: Bucket = Bucket {
        instant: SystemTime::now(),
        counter: 0,
        limit: 100,
        rate: 100,
        interval: Duration::from_secs(10),
    };

    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.counter += 1;
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.ingest(SystemTime::now());
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.leak(
        SystemTime::now()
            .checked_add(Duration::from_secs(10))
            .expect("Can add 10s to now()"),
    );
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());
}
