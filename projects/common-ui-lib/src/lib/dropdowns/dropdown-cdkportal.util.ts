export const updateOverlayPosition = ({
  selectOptionHeight,
  boundClient,
  windowHeight,
}: {
  selectOptionHeight: number;
  boundClient: any;
  windowHeight: number;
}) => {
  const childWindowBottomVerticalScrollHeight = 3;
  const bottomPosition = windowHeight - boundClient.bottom;
  const topPosition = windowHeight - (bottomPosition + 35);
  const currentSelectListHeight = selectOptionHeight + 5 + childWindowBottomVerticalScrollHeight;
  if (bottomPosition >= currentSelectListHeight) {
    return;
  }

  if (topPosition > currentSelectListHeight) {
    return (windowHeight - (currentSelectListHeight + bottomPosition + 30)).toFixed(2);
  }

  const adjustPosition = currentSelectListHeight - topPosition;
  return (windowHeight + adjustPosition - (currentSelectListHeight + bottomPosition + 30)).toFixed(2);
};
