import string

info = open('sigkey.in', 'r').read().split('\n')[1:]
info = sorted(info)

print "Inputed info: ", info, "."

count = 0
alphabet = list(string.ascii_lowercase)
print alphabet

for i in range(len(info) - 1):
    for j in range(i + 1, len(info)):
        # Connect two words together and sort by alphabet
        word = list(info[i] + info[j])
        del alphabet[len(word):]
        if set(word) == set(alphabet):
            count += 1
        alphabet = list(string.ascii_lowercase)

# Show result
print "Amount of pairs: ", count, "."
