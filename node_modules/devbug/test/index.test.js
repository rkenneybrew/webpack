const index = require('../lib/index');

describe('Message', () => {

  it('String in yellow', () => {
    index.msg('String in yellow', 'This is a string in yellow', index.colors.YELLOW);
  });

  it('Object in purple', () => {
    const testObject = { el1: { sub_el1: { sub_sub_el1: ['red','yellow','purple','purple'] , sub_sub_el2: { sub_sub_sub_el1: 'deep', sub_sub_sub_el2: ['very', 'deep', 'space'] }  } , sub_el2: {} } }
    index.msg('Object in purple', testObject, index.colors.PURPLE);
  });

  it('Boolean in blue', () => {
    index.msg('Boolean in blue', true, index.colors.BLUE);
  });

  it('Debugging with debugger off', () => {
    index.dbg('This should not display!', 'This is a string in red', index.colors.RED);
  });
});



describe('Debug', () => {


  it('String in red', () => {
    index._forceDebugMode.value = true;
    index.dbg('String in red', 'This is a string in red', index.colors.RED);
  });


  it('Object in green', () => {
    index._forceDebugMode.value = true;
    const testObject = { el1: { sub_el1: { sub_sub_el1: ['red','yellow','green','purple'] , sub_sub_el2: { sub_sub_sub_el1: 'deep', sub_sub_sub_el2: ['very', 'deep', 'space'] }  } , sub_el2: {} } }
    index.dbg('Object in green', testObject, index.colors.GREEN);
  });
});




