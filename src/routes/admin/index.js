import express from 'express';

import dashboard from './dashboard';
import schedule from './schedule';
import task from './task';
import note from './note';
import blog from './blog';
import member from './member';

const router = express.Router();

router.use(dashboard);
router.use(schedule);
router.use(task);
router.use(note);
router.use(blog);
router.use(member);

export default router;
