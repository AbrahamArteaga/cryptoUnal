import pandas as pd
import numpy as np
import json 


df = pd.read_json('transactions.json')

print(df.describe())