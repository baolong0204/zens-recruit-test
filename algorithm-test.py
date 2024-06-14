def miniMaxSum(arr):
    min_sum = float('inf')
    max_sum = float('-inf')
    total_sum = 0
    
    for num in arr:
        total_sum += num

    for num in arr:
        sum_excluding_current = total_sum - num
        if sum_excluding_current < min_sum:
            min_sum = sum_excluding_current
        if sum_excluding_current > max_sum:
            max_sum = sum_excluding_current
    print(min_sum, max_sum)

arr = []

while len(arr) != 5:
    print('Please enter 5 numbers seperated by white-spaces:')
    arr = list(map(int, input().rstrip().split()))

miniMaxSum(arr)