# -*- coding: utf-8 -*-
#dataset.ipynb
#chatbot finetuining code


#!pip install -U openai

import pandas as pd
df = pd.read_csv("chatbot_dataset.csv")
df.head(5)

#Format Data



import pandas as pd

def convert_to_gpt35_format(dataset):
    fine_tuning_data = []
    for _, row in dataset.iterrows():
        json_response = '{"Response": "' + row['Response'] + '"}'
        fine_tuning_data.append({
            "messages": [
                {"role": "user", "content": row['Questions']},
                {"role": "assistant", "content": json_response}
            ]
        })
    return fine_tuning_data

dataset = pd.read_csv("chatbot_dataset.csv")
converted_data = convert_to_gpt35_format(dataset)
print(converted_data[0]['messages'])

import json
json.loads(converted_data[0]["messages"][-1]["content"])

#Create Train and Val Set"""

from sklearn.model_selection import train_test_split


train_data, val_data = train_test_split(
    converted_data,
    test_size=0.2,
    random_state=42
)

type(train_data[0])

#Create JSONL file"""

def write_to_jsonl(data,file_path):
  with open(file_path,'w') as file :
    for entry in data:
      json.dump(entry, file)
      file.write('\n')

training_file_name='train.jsonl'
validation_file_name='val.jsonl'

write_to_jsonl(train_data,training_file_name)
write_to_jsonl(val_data,validation_file_name)

#!pip install openai

import openai

client = openai.OpenAI(api_key="#added api key here")

#Upload Trainning and Validation File"""

training_file = client.files.create(
    file=open(training_file_name, "rb"), purpose="fine-tune"
)
validation_file = client.files.create(
    file=open(validation_file_name, "rb"), purpose="fine-tune"
)

print("Training file id:", training_file.id)
print("Validation file id:",validation_file.id)

#Create Fine Tuning Job"""

suffix_name="yt"

response= client.fine_tuning.jobs.create(
    training_file=training_file.id,
    validation_file=validation_file .id,
    model="gpt-3.5-turbo",
    suffix=suffix_name,
)
response