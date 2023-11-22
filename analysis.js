// Vega-Lite을 사용한 시각화를 위한 함수
const visualizeData = async () => {
  // 첫 번째 데이터셋 불러오기
  const response1 = await fetch('파일명1.json');
  const data1 = await response1.json();

  // 첫 번째 데이터셋에 대한 시각화 명세 (막대 차트)
  const spec1 = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      description: '첫 번째 그래프: 막대 차트',
      data: { values: data1 },
      mark: 'bar',
      encoding: {
          x: { field: 'category', type: 'ordinal' },
          y: { field: 'amount', type: 'quantitative' }
      }
  };

  // 첫 번째 데이터셋 시각화
  vegaEmbed('#visualization1', spec1);

  // 두 번째 데이터셋 불러오기
  const response2 = await fetch('파일명2.json');
  const data2 = await response2.json();

  // 두 번째 데이터셋에 대한 시각화 명세 (원형 차트)
  const spec2 = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      description: '두 번째 그래프: 원형 차트',
      data: { values: data2 },
      mark: 'arc', // 원형 차트
      encoding: {
          theta: { field: 'amount', type: 'quantitative' }, // 원형 차트의 각도
          color: { field: 'category', type: 'nominal' } // 색상으로 범주 구분
      }
  };

  // 두 번째 데이터셋 시각화
  vegaEmbed('#visualization2', spec2);
};

// 함수 실행으로 시각화 과정 시작
visualizeData();
