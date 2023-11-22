const visualizeData = async () => {
  // 첫 번째 데이터셋 불러오기
  const response1 = await fetch('/gender_recid.json');
  const data1 = await response1.json();

  // 첫 번째 데이터셋에 대한 시각화 명세 (막대 차트)
  const spec1 = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      description: '성별에 따른 일반적 재범 발생 여부',
      data: { values: data1 },
      mark: 'bar',
      encoding: {
          x: { field: 'sex', type: 'nominal', axis: { title: '성별' }},
          y: { field: 'count', type: 'quantitative', axis: { title: '재범 수' }},
          color: { field: 'is_recid', type: 'nominal', axis: { title: '재범 발생 여부' }}
      }
  };
  vegaEmbed('#visualization1', spec1);

  // 두 번째 데이터셋 불러오기
  const response2 = await fetch('/race_violent_recid.json');
  const data2 = await response2.json();

  // 두 번째 데이터셋에 대한 시각화 명세 (히트맵)
  const spec2 = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      description: '인종에 따른 폭력적 재범 발생 여부',
      data: { values: data2 },
      mark: 'rect',
      encoding: {
          x: { field: 'race', type: 'nominal', axis: { title: '인종' }},
          y: { field: 'is_violent_recid', type: 'nominal', axis: { title: '폭력적 재범 발생 여부' }},
          color: { field: 'count', type: 'quantitative', legend: { title: '재범 수' }}
      }
  };
  vegaEmbed('#visualization2', spec2);
};

visualizeData();
