import os
import csv
import re
from bs4 import BeautifulSoup
from urllib.request import urlopen

# Web scrapping
html = urlopen("https://screens.app.ist.ac.at/menu_weekly").read().decode('utf-8')
soup = BeautifulSoup(html, 'html.parser')

# Header names
header_names = ['year',
                'week',
                'start_date',
                'end_date',
                'day',
                'date',
                'category',
                'subcategory',
                'price',
                'allergens',
                'name']

# Init file
csv_file = 'sv_restaurant_data.csv'
csv_file = os.path.join(os.path.dirname(os.path.realpath(__file__)), csv_file)
if not os.path.isfile(csv_file):
  with open(csv_file, 'w', newline='') as f:
    csv.DictWriter(f, fieldnames=header_names).writeheader()


# Parse week information
base_row = {}
header = soup.find('div', {'class': 'header'})
base_row['week'] = int(soup.find('h4').string.replace('Week ', ''))
base_row['start_date'], base_row['end_date'] = [
    x.string.strip() for x in soup.find('h5').findAll('b')]
base_row['year'] = int(base_row['start_date'].split('-', 1)[0].strip())


# Parse daily information
rows = []
for i, day_row in enumerate(soup.find(
    'div', {'class': 'content weekly'}).find('table').findAll('tr')):
  # First line contains the category names
  if i == 0:
    category_names = [x.string.strip() for x in day_row.findAll('th')]
    continue
  # Otherwise, parse items in each category
  for j, category_column in enumerate(day_row.findAll('td')):
    # First column contains the week day
    if j == 0:
      day = category_column.find('b').string.strip()
      base_row['day'], base_row['date'] = day.split(', ')
      continue
    # Parse all item in the current category
    row = base_row.copy()
    row['category'] = category_names[j]
    for option in category_column.findAll('div'):
      txt = option.get_text()
      # price
      try:
        row['price'] = float(re.findall('\d+.\d*', txt)[0])
      except (KeyError, TypeError):
        row['price'] = ''
      # allergens
      try:
        row['allergens'] = re.findall('\[[A-Z]*\]', txt)[0][1:-1]
      except (IndexError, TypeError):
        row['allergens'] = ''
      # name and subcategory
      try:
        row['subcategory'] = option.find('b').string
        row['name'] = txt.split(' (', 1)[0].split(': ')[1].strip()
      except AttributeError:
        row['subcategory'] = ''
        row['name'] = txt.split(' (', 1)[0].strip()
      # Write row
      with open(csv_file, 'a', newline='') as f:
        csv.DictWriter(f, fieldnames=header_names).writerow(row)
