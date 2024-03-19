use std::{
    thread::sleep,
    time::{Duration, SystemTime},
};

#[derive(Debug)]
struct Bucket {
    pub last_leak: SystemTime,
    pub counter: u128,
    pub limit: u128,
    pub rate: u128,
    pub interval: Duration,
}

impl Bucket {
    fn ingest(&mut self) -> &mut Self {
        self.counter += 1;
        self
    }

    fn is_limited(&self) -> bool {
        return self.counter > self.limit;
    }

    fn leak(&mut self, new_instant: SystemTime) -> &mut Self {
        let elapsed = new_instant
            .duration_since(self.last_leak)
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
        self.last_leak = new_instant;
        self
    }

    fn should_stop(&mut self, new_instant: SystemTime) -> bool {
        let stop = self.ingest().is_limited();
        self.leak(new_instant);
        stop
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
        last_leak: SystemTime::now(),
        counter: 0,
        limit: 10,
        rate: 10,
        interval: Duration::from_secs(10),
    };

    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.counter += 1;
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.ingest();
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    bucket.leak(
        SystemTime::now()
            .checked_add(Duration::from_secs(1))
            .expect("Can add 10s to now()"),
    );
    println!("{:#?}, limited: {:#?}", bucket, bucket.is_limited());

    let mut stoped = false;
    loop {
        let now = SystemTime::now();
        let stop = bucket.is_limited();
        if stop {
            bucket.leak(now);
            stoped = true;
            sleep(Duration::from_secs(1))
        } else {
            bucket.ingest();
        }
        println!(
            "{:#?}, elapsed: {:#?}, stop?: {:#?}, stoped? {:#?}",
            bucket.counter,
            now.duration_since(bucket.last_leak.min(now)).unwrap(),
            stop,
            stoped
        );
        if stoped && !stop {
            break;
        }
    }
}
