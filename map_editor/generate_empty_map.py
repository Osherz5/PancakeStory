import sys
import json

USAGE = 'Usage: python2.7 generate_empty_map.py 100 100 > map.json'

if len(sys.argv) < 3:
    print 'Error: Map dimensions are missing'
    print USAGE
    sys.exit(1)

map_size = int(sys.argv[1]) * int(sys.argv[2])
map_data = [[0,0]] * map_size
print json.dumps(map_data)
