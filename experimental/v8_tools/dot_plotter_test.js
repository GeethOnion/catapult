'use strict';
const getStackedOffsets = (data) => {
  const dotPlotter = new DotPlotter();
  // Stubs the x axis scale so that theres a 1:1 mapping between pixel
  // values and memory values.
  const scale = {
    invert: x => x,
  };
  const stackedLocations = dotPlotter.computeDotStacking_(data.source, scale);
  return stackedLocations.map(({x, stackOffset}) => stackOffset);
};
describe('DotPlotter', function() {
  describe('dot stacking', function() {
    it('should not stack far away values', function() {
      const data = {
        source: [5, 40, 90, 100],
      };
      const stackedOffsets = getStackedOffsets(data);
      chai.expect(stackedOffsets).to.eql([0, 0, 0, 0]);
    });
    it('should stack duplicates', function() {
      const data = {
        source: [100, 100, 100],
      };
      const stackedOffsets = getStackedOffsets(data);
      chai.expect(stackedOffsets).to.have.members([-1, 0, 1]);
    });
    it('should allow for multiple stacks', function() {
      const data = {
        source: [992, 994, 555, 556, 15],
      };
      const stackedOffsets = getStackedOffsets(data);
      chai.expect(stackedOffsets).to.have.members([-1, 0, -1, 0, 0]);
    });
  });
});
