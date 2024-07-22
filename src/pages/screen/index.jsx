import './index.scss';

import LeftSection from './LeftSection';
import RightSection from './RightSection';
import CenterSection from './CenterSection';

const Screen = () => {
  return (
    <div className="screen">
      <div className="left">
        <LeftSection />
      </div>
      <div className="center">
        <CenterSection />
      </div>
      <div className="right">
        <RightSection />
      </div>
    </div>
  );
};

export default Screen;

