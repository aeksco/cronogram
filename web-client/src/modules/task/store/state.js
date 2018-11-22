import { COLLECTION_STATE, MODEL_STATE } from '@/store/lib/mixins'

// Task Module State
export default {
  ...COLLECTION_STATE,
  ...MODEL_STATE,
  user: {},
  newModel: {},
  testOutput: {},
  testing: false,
  editModel: {}
}
