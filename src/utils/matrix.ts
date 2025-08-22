function getTranslate3dX(element:HTMLElement) {
    const style = getComputedStyle(element);
    const transform = style.transform;

    if (!transform || transform === 'none') {
      return 0; // transform이 없으면 X이동도 0
    }

    const match = transform.match(/^matrix3d\((.+)\)$/);
    if (match) {
      const values = match[1].split(',').map(v => parseFloat(v.trim()));
      return values[12]; // 13번째 값이 X 좌표
    }

    // fallback for translate() or translateX() which uses 2D matrix
    const match2D = transform.match(/^matrix\((.+)\)$/);
    if (match2D) {
      const values = match2D[1].split(',').map(v => parseFloat(v.trim()));
      return values[4]; // 5번째 값이 X 좌표
    }

    return 0;
}

export default getTranslate3dX;