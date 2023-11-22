import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = pd.read_csv('/Users/lmr/Desktop/SE1115/1122/repo/compass.csv')

selected_columns = ['sex', 'age', 'race', 'is_violent_recid', 'is_recid', 'event']
df = data[selected_columns]

# 그래프 1: 성별과 일반적 재범 발생 여부(is_recid)의 관계 (막대 그래프)
sns.countplot(x='sex', hue='is_recid', data=df)
plt.title('Gender vs. General Recidivism')
plt.show()

# 그래프 2: 인종과 폭력적 재범 발생 여부(is_violent_recid)의 관계 (히트맵)
race_violent_recid_matrix = pd.crosstab(df['race'], df['is_violent_recid'])
sns.heatmap(race_violent_recid_matrix, annot=True, fmt='d', cmap='Blues')
plt.title('Race vs. Violent Recidivism')
plt.show()

# 성별과 일반적 재범 발생 여부 데이터 집계
gender_recid = df.groupby(['sex', 'is_recid']).size().reset_index(name='count')

# 인종과 폭력적 재범 발생 여부 데이터 집계
race_violent_recid = df.groupby(['race', 'is_violent_recid']).size().reset_index(name='count')

# JSON 파일로 저장
gender_recid.to_json('/Users/lmr/Desktop/SE1115/1122/repo/gender_recid.json', orient='records')
race_violent_recid.to_json('/Users/lmr/Desktop/SE1115/1122/repo/race_violent_recid.json', orient='records')