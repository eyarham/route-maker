import api from "../_common/api";

const configApi = (db) => {
  const { updateField, getDocsByField, getDocsByFieldSub } = api(db, "configs");

  const getActiveConfig = async () => {
    const activeConfigs = await getDocsByField("isActive", true);
    if (activeConfigs.length === 1) {
      return activeConfigs[0];
    }
  }

  const getActiveConfigSub = (callback) => {
    return getDocsByFieldSub("isActive", true, (activeConfigs) => {
      if (activeConfigs.length === 1) {
        callback(activeConfigs[0]);
      }
    });
  }

  const updateConfigValue = async (fieldObj) => {
    const activeConfig = await getActiveConfig();
    return await updateField(activeConfig.id, fieldObj)
  }

  const getConfigValue = async (configField) => {
    const activeConfig = await getActiveConfig();
    return activeConfig.data()[configField];
  }

  return { updateConfigValue, getConfigValue, getActiveConfigSub };
}
export default configApi