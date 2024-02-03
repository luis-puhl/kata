struct Bucket {
    instant: timestamp,
    counter: i32,
    limit: i32,
    rate: i32,
    interval: i32,
}

fn main() {
    let bucket = Bucket {
        
    instant: 0,
    counter: 0,
    limit: 100,
    rate: 100,
    interval: 60,
    };
}