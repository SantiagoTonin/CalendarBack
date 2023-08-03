import { User } from "../models/user.js";
import { picture } from "../models/picture.js";
import { calendar } from "../models/calendar.js";
import { cell } from "../models/cells.js";
import { image } from "../models/imagen.js";
import { tasks } from "../models/tasks.js";


export const dataUser = async (dataId) => {
  try {
    const result = await User.findByPk(dataId, {
      include: [
        { model: picture },
        {
          model: calendar,
          include: {
            model: cell,
            include: [{ model: tasks }, { model: image }],
          },
        },
      ],
    });

    return result
  } catch (error) {
    res.status(500).json({ error: error });
  }
};