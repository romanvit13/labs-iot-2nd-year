import timeit

def mergeSort(alist):
    global exc
    global comp
    if len(alist) > 1:
        mid = len(alist) // 2
        lefthalf = alist[:mid]
        righthalf = alist[mid:]

        mergeSort(lefthalf)
        mergeSort(righthalf)

        i = 0
        j = 0
        k = 0
        while i < len(lefthalf) and j < len(righthalf):
            comp+=1
            if lefthalf[i] < righthalf[j]:
                alist[k] = lefthalf[i]
                i = i + 1
            else:
                alist[k] = righthalf[j]
                j = j + 1
            k = k + 1

        while i < len(lefthalf):
            exc +=1
            alist[k] = lefthalf[i]
            i = i + 1
            k = k + 1

        while j < len(righthalf):
            exc +=1
            alist[k] = righthalf[j]
            j = j + 1
            k = k + 1

if __name__ == '__main__':
    comp = 0
    exc = 0
    afile = open('1000_input.txt', 'r')
    alist = afile.read().split()
    for i in range(alist.__len__()):
        alist[i] = float(alist[i])
    afile.close()
    start = timeit.default_timer()
    mergeSort(alist)
    assert alist == sorted(alist)
    print(alist)
    print 'Time of work:'
    print  timeit.default_timer()-start
    print '|merge    : comp - ' + str(comp) + ', exchanges - ' + str(exc)
