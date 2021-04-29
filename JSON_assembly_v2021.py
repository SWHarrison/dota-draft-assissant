'''
File to convert CSV file into json
'''
import pprint

# Put all file names into this array.
# Remember to change the corresponding values in the javascript file as well

files_to_read = ['hero_data.CSV']								# Files for lookup

#allowed_types = ['4','5','6','C','V']						# Files for lookup

# Years of data in file
start_year = 1969
end_year = 2050

# Years of data wanted for final result
data_start_year = 1970
data_end_year = 2019

# This will either create or replace a file with this name in the folder this script is run from.
file_output = "hero_data.json"

num_years = end_year + 1 - start_year

num_data_years = data_end_year + 1 - data_start_year

hero_dict = {}

for file_name in files_to_read:

    file = open(file_name,'r')
    read_lines = file.readlines()
    file.close

    first_line = None

    #for(int i = 0; i<read_lines.size;i++)
    for i in range(len(read_lines)):

        split_line = read_lines[i].replace(" ","_").strip().split(',')
        if not first_line:
            first_line = split_line
        print(split_line)

        new_hero = {}
        for i in range(len(first_line)):
            new_hero[first_line[i]] = split_line[i]

        hero_dict[split_line[0]] = new_hero

# Takes dictionary and prints to console/terminal a formatted version for JSON
def JSON_convert(data_dict):
	print("{")
	for key in data_dict:
		to_print = "\t" + key +": {"
		for key2 in data_dict[key]:
			#print(type(data_dict[key][key2]))
			if(type(data_dict[key][key2]) is list):
				#print("doing thing")
				to_print += key2 + ": ["
				for value in data_dict[key][key2]:
					to_print += str(value) + ", "
				to_print = to_print[:-2] + "], "
			else:
				#print("not")
				to_print += key2 + ": \"" + data_dict[key][key2] + "\", "

		to_print = to_print[:-2] + "},"
		print(to_print)
	print("}")

# Writes JSON to file. File should be of type .json
def JSON_write_file(file_name):

	file = open(file_name, 'w')
	file.write('HeroData = {\n')
	for key in hero_dict:
		to_print = "\t\"" + key +"\": {"
		for key2 in hero_dict[key]:
			#print(type(data_dict[key][key2]))
			if(type(hero_dict[key][key2]) is list):
				#print("doing thing")
				to_print += "\"" + key2 + "\": ["
				for value in hero_dict[key][key2]:
					to_print += str(value) + ", "
				to_print = to_print[:-2] + "], "
			else:
				#print("not")
				to_print += "\"" + key2 + "\": \"" + hero_dict[key][key2] + "\", "

		to_print = to_print[:-2] + "},"
		file.write(to_print + "\n")
	file.write("}")


pprint.pprint(hero_dict)
#JSON_convert(hero_dict)
JSON_write_file(file_output)
