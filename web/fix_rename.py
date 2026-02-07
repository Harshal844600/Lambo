import os
import re

directory = "public/images/zonda-sequence"
# Check if directory exists
if not os.path.exists(directory):
    print(f"Directory not found: {directory}")
    exit(1)

files = os.listdir(directory)
# Filter for jpg files and specifically look for ezgif-frame pattern or existing numeric ones we want to normalize
# Actually, the user might have some mixed state. Let's just find anything ending in .jpg
jpg_files = [f for f in files if f.endswith('.jpg')]

# We need to sort them intelligently.
# If they are named ezgif-frame-001.jpg, we want to sort by that number.
# If they are already numeric, we sort by number.

def get_sort_key(filename):
    # Try to extract number from ezgif-frame-XXX
    match = re.search(r'ezgif-frame-(\d+)', filename)
    if match:
        return int(match.group(1))
    
    # Try to extract simple number
    match = re.search(r'^(\d+)\.jpg$', filename)
    if match:
        return int(match.group(1))
    
    return 0 # Should not happen based on our previous knowledge

# Sort files based on their sequence number
jpg_files.sort(key=get_sort_key)

print(f"Found {len(jpg_files)} images.")

for i, filename in enumerate(jpg_files, 1):
    old_path = os.path.join(directory, filename)
    new_filename = f"{i}.jpg"
    new_path = os.path.join(directory, new_filename)
    
    # Only rename if necessary to avoid collision issues in a naive loop, 
    # but since we are mapping 215 files to 1..215, we might overlap.
    # Safe way: rename to temporary first.
    
    temp_path = os.path.join(directory, f"temp_{i}.tmp")
    os.rename(old_path, temp_path)

# Second pass: rename temp to final
for i in range(1, len(jpg_files) + 1):
    temp_path = os.path.join(directory, f"temp_{i}.tmp")
    final_path = os.path.join(directory, f"{i}.jpg")
    os.rename(temp_path, final_path)

print("Renaming complete.")
