import random
import os
import sys
print sys.path
print sys.version
from time import sleep
#from pyfiglet import Figlet
# from progressive.bar import Bar
import pydesignengine as bs
import json

#f = Figlet(font='standard')
#print f.renderText('BlackSmith')

# print ">>> RUNNING BENCHMARKS"
# benchmark = bs.createStandardMicroBenchmarkSuite()
# benchmark.trainAllBenchmarks()
# sys.exit(1)


print ">>> Generating data..."

widthValue = 100000
readWriteRatio1 = 0
readWriteRatio2 = 1
num = 100000
dist1 = bs.UniformDistribution(913812, 1, widthValue)
generator1 = bs.QueryWorkloadGenerator(0, num, dist1)
workload1 = generator1.generate()
dist2 = bs.UniformDistribution(913812, 1, widthValue)
generator2 = bs.QueryWorkloadGenerator(1, 10, dist2);
workload2 = generator2.generate()
workload = workload1 + workload2
print ">>> Done."



print ">>> Finding optimal system design..."
# SETUP UI
#bar = Bar(max_value=100, fallback=True)
#bar.cursor.clear_lines(2)
#bar.cursor.save()
def _callback(progress, solution):
    #bar.cursor.restore()
    #bar.draw(value=progress)
	# print solution
	#print progress
	print solution.toJson()
	# print 'test'



def _solution_callback(element_id, cost):
    print element_id, cost

options = bs.SystemDesignOptionSet()

allOpts = {}
for line in open("library.json"):
	print line
	js = json.loads(line)
	definition =  bs.ArchetypeDefinition();
	definition.fromJson(line)
	allOpts[str(js["metadata.general.name"])] = definition

options += bs.SystemDesignOption(allOpts['UNORDERED DATAPAGE'], True)
options += bs.SystemDesignOption(allOpts['QUANTILES NODE'], False)
options += bs.SystemDesignOption(allOpts['LINKED LIST'], False)

# RUN ENGINE
e = bs.EngineRunner(options, 3, _callback)
e.solve(workload)

# TODO: PASS SOLUTION POINTER IN CALLBACK!
