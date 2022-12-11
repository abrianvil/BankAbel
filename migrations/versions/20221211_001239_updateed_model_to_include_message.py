"""updateed model to include message

Revision ID: e17f6e1f5408
Revises: 8e3293bb1c26
Create Date: 2022-12-11 00:12:39.947456

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e17f6e1f5408'
down_revision = '8e3293bb1c26'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('transactions', sa.Column('message', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('transactions', 'message')
    # ### end Alembic commands ###