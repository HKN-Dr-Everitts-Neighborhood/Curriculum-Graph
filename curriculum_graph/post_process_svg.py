# python
import os
import os.path

def post_process_file(file_path):
    print "post processing", file_path
    with open(file_path, 'r') as file:
        with open(file_path + ".pp", 'w') as output:
            for line in file:
                line = line.replace("<title>", "<text style='display:none'>")
                line = line.replace("</title>", "</text>")
                output.write(line)
    os.remove(file_path)
    os.rename(file_path+".pp", file_path)
            

for directory in ('output', 'temp'):
    for file_name in os.listdir(directory):
        rel_path = os.path.join(directory, file_name)
        if file_name.endswith('.svg') and os.path.isfile(rel_path):
            post_process_file(rel_path)

