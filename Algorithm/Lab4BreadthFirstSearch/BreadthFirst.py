# adjacent graph
graph = {
    '1': ['2', '3', '4'],
    '2': ['5', '6'],
    '3': ['2', '1'],
    '4': ['1'],
    '5': ['1', '4']
}


def bds(graph_local, start, end):
    # Create queue
    queue = [[start]]
    # push the first path into the queue

    # When smth exist there.

    while queue:
        # take first element from queue
        path = queue.pop(0)
        # get the last vertex from the path
        vertex = path[-1]

        # check if path found
        if vertex == end:
            return path

        # create new path and append it to queue
        for j in graph_local.get(vertex, []):
            new_path = list(path)
            new_path.append(j)
            queue.append(new_path)

    return 0


result = bds(graph, '1', '6')
i = 0

for i in range(result.__len__() - 1):
    print str(result[i]) + " ->",
print str(result[i + 1]) + '!'
