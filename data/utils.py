import os

def relative_to(file, relative_path):
    dir = os.path.dirname(file)
    return os.path.join(dir, relative_path)
