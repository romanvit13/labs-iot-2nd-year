info = open('sigkey.in', 'r').read().split('\n')[1:]
info = sorted(info)

print info

count = 0

for i in range(info.__len__()):
    for j in range(i + 1, info.__len__()):
        # Connect two words together and sort by alphabet
        word = sorted(info[i] + info[j])
        print word
        # Check if first letter is a
        if word[0] == 'a':
            # Check if all letters exist
            if ord(word[word.__len__() - 1]) - ord(word[0]) == word.__len__() - 1:
                count = count + 1
                print 'ok'
            print

# Show result
print count
