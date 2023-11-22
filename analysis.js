// Vega-Lite을 사용한 시각화를 위한 함수
const visualizeData = async () => {
  // 'correlation_matrix.json' 파일을 비동기적으로 불러옴
  const response = await fetch('correlation_matrix.json');
  // 응답으로부터 JSON 데이터를 추출
  const data = await response.json();

  // Vega-Lite을 위한 시각화 명세(specification) 정의
  const spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json', // Vega-Lite 스키마 버전
      description: 'A simple bar chart with embedded data.', // 시각화에 대한 간단한 설명
      data: { values: data }, // 사용할 데이터셋 지정
      mark: 'bar', // 막대 차트(mark) 사용
      encoding: { // 데이터를 시각적 요소로 매핑하는 방법 정의
          x: { field: 'category', type: 'ordinal' }, // x축에 나타낼 필드와 데이터 유형(범주형) 지정
          y: { field: 'amount', type: 'quantitative' } // y축에 나타낼 필드와 데이터 유형(수치형) 지정
      }
  };

  // Vega-Embed를 사용하여 '#visualization' 요소에 시각화 embed
  vegaEmbed('#visualization', spec);
};

// 함수 실행으로 시각화 과정 시작
visualizeData();
