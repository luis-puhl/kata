from sortedcontainers import SortedList

# this is not mine, just whanted to test a std lib implementation of it
# Runtime 269 ms Beats 13.72%
# Memory 39.94 MB Beats 87.31%
class MedianFinder:
    def __init__(self):
        self.arr = SortedList()

    def addNum(self, num: int) -> None:
        self.arr.add(num)

    def findMedian(self) -> float:
        n = len(self.arr)
        if n % 2 == 1:
            return self.arr[n // 2]
        return (self.arr[n // 2] + self.arr[n // 2 - 1]) / 2
