const { PrismaClient } = require('@prisma/client');
const express = require('express');

const router = express.Router();

const prisma = new PrismaClient();
// 투두 조회
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();

    res.json(todos);
  } catch (error) {
    console.error(error);
  }
});
// 투두 생성
router.post('/', async (req, res) => {
  try {
    const { todo, userId } = req.body;

    if (!todo) {
      return res.status(400).json({ ok: false, error: 'Not exist todo.' });
    }
    if (!userId) {
      return res.status(400).json({ ok: false, error: 'Not exist userId.' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: 'Not exist user.' });
    }

    const newTodo = await prisma.todo.create({
      data: {
        todo,
        isDone: false,
        userId: user.id,
      },
    });

    res.json({ ok: true, todo: newTodo });
  } catch (error) {
    console.error(error);
  }
});

// 투두 조회
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { skip } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: 'Not exist user.' });
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json({ ok: true, todos });
  } catch (error) {
    console.error(error);
  }
});

// 투두 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await prisma.todo.findMany({
      where: {
        id: parseInt(id),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ ok: true, todos });
  } catch (error) {
    console.error(error);
  }
});
//투두 수정
router.put('/:todoId', async (req, res) => {
  const { todoId } = req.params;
  const { todo, isDone } = req.body;

  if (!todoId) {
    res.status(400).json({ error: '존재하지 않는 Id 입니다.' });
  }
  if (!todo) {
    res.status(400).json({
      error: '타이틀과 설명을 적어 주셔야 합니다.',
    });
  }
  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(todoId),
    },
    data: {
      todo,
      isDone: isDone,
    },
  });

  res.json({ ok: true, todo: updatedTodo });
});

// 투두 완료
router.put('/:id/done', async (req, res) => {
  try {
    const { id } = req.params;

    const existTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existTodo) {
      return res.status(400).json({ ok: false, error: 'Not exist todo.' });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isDone: !existTodo.isDone,
      },
    });

    res.json({ ok: true, todo: updatedTodo });
  } catch (error) {
    console.error(error);
  }
});

// 투두 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    console.log(req.body);
    const existTodo = await prisma.todo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existTodo) {
      return res.status(400).json({ ok: false, error: 'Not exist todo.' });
    }
    console.log(existTodo.userId !== parseInt(userId));
    console.log(existTodo.userId);
    console.log(userId);
    if (existTodo.userId !== parseInt(userId)) {
      return res.status(400).json({ ok: false, error: 'Not todo have user' });
    }

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ ok: true, todo: deletedTodo });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
