from flask import Flask, render_template
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = Flask(__name__)

@app.route('/')
def index():
    # 데이터 불러오기
    data = pd.read_csv('C:/Users/218/Desktop/cox-violent-parsed_filt_usable.csv')

    # 필요한 변수 선택
    selected_columns = ['sex', 'age', 'race', 'is_violent_recid', 'is_recid', 'event']
    df = data[selected_columns]

    # 그래프 1: 성별과 일반적 재범 발생 여부(is_recid)의 관계 (막대 그래프)
    plt.figure(figsize=(8, 6))
    sns.countplot(x='sex', hue='is_recid', data=df)
    plt.title('Gender vs. General Recidivism')
    plt.savefig('static/gender_recid_plot.png')
    plt.close()

    # 그래프 2: 인종과 폭력적 재범 발생 여부(is_violent_recid)의 관계 (히트맵)
    plt.figure(figsize=(10, 8))
    race_violent_recid_matrix = pd.crosstab(df['race'], df['is_violent_recid'])
    sns.heatmap(race_violent_recid_matrix, annot=True, fmt='d', cmap='Blues')
    plt.title('Race vs. Violent Recidivism')
    plt.savefig('static/race_violent_recid_plot.png')
    plt.close()

    # 데이터프레임을 HTML로 변환하여 전달
    analysis_table_html = df.describe().to_html(classes='table table-bordered table-hover')

    return render_template('index.html', analysis_table_html=analysis_table_html)

if __name__ == '__main__':
    app.run(debug=True)
